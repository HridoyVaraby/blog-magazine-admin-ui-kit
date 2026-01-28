#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import crypto from 'crypto';

const REPO_URL = 'https://github.com/HridoyVaraby/blog-magazine-admin-ui-kit.git';
const TEMP_DIR = '.temp-admin-kit';

async function main() {
    console.log('\n');
    console.log(chalk.bold.cyan('╔════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║  📦 Blog & Magazine Admin UI Kit Installer     ║'));
    console.log(chalk.bold.cyan('╚════════════════════════════════════════════════╝'));
    console.log('\n');

    // Step 1: Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        console.log(chalk.red('❌ Error: No package.json found in current directory.'));
        console.log(chalk.yellow('   Please run this command from the root of your Next.js project.'));
        process.exit(1);
    }

    // Step 2: Confirm with user
    const response = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: 'This will copy the Admin Dashboard to ./app/admin. Proceed?',
        initial: true
    });

    if (!response.proceed) {
        console.log(chalk.yellow('\n⚠️  Installation cancelled.'));
        process.exit(0);
    }

    // Step 3: Clone the repository
    const cloneSpinner = ora('Cloning Admin UI Kit repository...').start();
    try {
        // Remove temp dir if exists
        if (fs.existsSync(TEMP_DIR)) {
            fs.removeSync(TEMP_DIR);
        }
        execSync(`git clone --depth 1 ${REPO_URL} ${TEMP_DIR}`, { stdio: 'pipe' });
        cloneSpinner.succeed('Repository cloned successfully');
    } catch (error) {
        cloneSpinner.fail('Failed to clone repository');
        console.log(chalk.red(`   ${error.message}`));
        process.exit(1);
    }

    // Step 4: Copy files
    const copySpinner = ora('Copying files...').start();
    try {
        // Core admin files (overwrite)
        await fs.copy(path.join(TEMP_DIR, 'app/admin'), './app/admin');
        await fs.copy(path.join(TEMP_DIR, 'components/admin'), './components/admin');

        // UI components (merge - don't overwrite existing)
        await fs.copy(path.join(TEMP_DIR, 'components/ui'), './components/ui', { overwrite: false });

        // Providers (copy if not exists)
        const providersPath = './components/providers.tsx';
        if (!fs.existsSync(providersPath)) {
            await fs.copy(path.join(TEMP_DIR, 'components/providers.tsx'), providersPath);
        }

        // Hooks (merge)
        await fs.copy(path.join(TEMP_DIR, 'hooks'), './hooks', { overwrite: false });

        // Lib utilities (merge)
        await fs.copy(path.join(TEMP_DIR, 'lib'), './lib', { overwrite: false });

        // Public assets (merge)
        await fs.copy(path.join(TEMP_DIR, 'public'), './public', { overwrite: false });

        // Auth config (copy if not exists)
        const authPath = './auth.ts';
        if (!fs.existsSync(authPath)) {
            await fs.copy(path.join(TEMP_DIR, 'auth.ts'), authPath);
        }

        // Auth API route
        await fs.ensureDir('./app/api/auth/[...nextauth]');
        await fs.copy(
            path.join(TEMP_DIR, 'app/api/auth/[...nextauth]/route.ts'),
            './app/api/auth/[...nextauth]/route.ts',
            { overwrite: false }
        );

        copySpinner.succeed('Files copied successfully');
    } catch (error) {
        copySpinner.fail('Failed to copy files');
        console.log(chalk.red(`   ${error.message}`));
        cleanup();
        process.exit(1);
    }

    // Step 5: Install dependencies
    const depsSpinner = ora('Installing dependencies...').start();
    try {
        // Read dependencies from cloned package.json
        const kitPackageJson = fs.readJsonSync(path.join(TEMP_DIR, 'package.json'));
        const dependencies = kitPackageJson.dependencies || {};

        // Filter out next, react, react-dom (user should have these)
        const excludePackages = ['next', 'react', 'react-dom'];
        const packagesToInstall = Object.entries(dependencies)
            .filter(([name]) => !excludePackages.includes(name))
            .map(([name, version]) => `${name}@${version}`)
            .join(' ');

        // Detect package manager
        const packageManager = detectPackageManager();
        const installCmd = packageManager === 'npm'
            ? `npm install ${packagesToInstall}`
            : `${packageManager} add ${packagesToInstall}`;

        execSync(installCmd, { stdio: 'pipe', cwd: process.cwd() });

        // Install dev dependencies
        const devDeps = kitPackageJson.devDependencies || {};
        const devPackagesToInstall = Object.entries(devDeps)
            .filter(([name]) => name.includes('tailwindcss') || name.includes('typography'))
            .map(([name, version]) => `${name}@${version}`)
            .join(' ');

        if (devPackagesToInstall) {
            const devInstallCmd = packageManager === 'npm'
                ? `npm install -D ${devPackagesToInstall}`
                : `${packageManager} add -D ${devPackagesToInstall}`;
            execSync(devInstallCmd, { stdio: 'pipe', cwd: process.cwd() });
        }

        depsSpinner.succeed(`Dependencies installed with ${packageManager}`);
    } catch (error) {
        depsSpinner.fail('Failed to install dependencies');
        console.log(chalk.yellow('   You may need to install dependencies manually.'));
        console.log(chalk.dim(`   ${error.message}`));
    }

    // Step 6: Configure .env with AUTH_SECRET
    const envSpinner = ora('Configuring environment...').start();
    try {
        const envPath = path.join(process.cwd(), '.env');
        const authSecret = crypto.randomBytes(32).toString('hex');

        if (fs.existsSync(envPath)) {
            // .env exists - check if AUTH_SECRET is already defined
            const envContent = fs.readFileSync(envPath, 'utf-8');
            if (!envContent.includes('AUTH_SECRET')) {
                // Append AUTH_SECRET to existing .env
                fs.appendFileSync(envPath, `\nAUTH_SECRET="${authSecret}"\n`);
                envSpinner.succeed('.env configured safely with AUTH_SECRET');
            } else {
                envSpinner.succeed('.env already has AUTH_SECRET (skipped)');
            }
        } else {
            // Create new .env file
            fs.writeFileSync(envPath, `AUTH_SECRET="${authSecret}"\n`);
            envSpinner.succeed('.env created with AUTH_SECRET');
        }
    } catch (error) {
        envSpinner.fail('Could not configure .env');
        console.log(chalk.yellow('   You may need to set AUTH_SECRET manually.'));
        console.log(chalk.dim(`   ${error.message}`));
    }

    // Step 7: Cleanup
    cleanup();

    // Step 8: Success message
    console.log('\n');
    console.log(chalk.bold.green('✅ Admin UI Kit installed successfully!'));
    console.log('\n');
    console.log(chalk.yellow('👉 ACTION REQUIRED:'));
    console.log(chalk.white('   1. Import the theme in your layout:'));
    console.log(chalk.cyan("      import '@/components/admin/admin-theme.css';"));
    console.log(chalk.white('   2. Update tailwind.config.ts to include:'));
    console.log(chalk.dim("      - './app/admin/**/*.{ts,tsx}'"));
    console.log(chalk.dim("      - './components/admin/**/*.{ts,tsx}'"));
    console.log(chalk.dim("      - './components/ui/**/*.{ts,tsx}'"));
    console.log(chalk.white('   3. Wrap your app with <Providers> in layout.tsx'));
    console.log('\n');
    console.log(chalk.cyan('🚀 Navigate to /admin to see your dashboard!'));
    console.log('\n');
}

function detectPackageManager() {
    // Check for lock files
    if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
    if (fs.existsSync('bun.lockb')) return 'bun';
    if (fs.existsSync('yarn.lock')) return 'yarn';
    if (fs.existsSync('package-lock.json')) return 'npm';

    // Default to npm
    return 'npm';
}

function cleanup() {
    const cleanupSpinner = ora('Cleaning up...').start();
    try {
        if (fs.existsSync(TEMP_DIR)) {
            fs.removeSync(TEMP_DIR);
        }
        cleanupSpinner.succeed('Cleanup complete');
    } catch (error) {
        cleanupSpinner.warn('Could not remove temp directory');
    }
}

main().catch((error) => {
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
    cleanup();
    process.exit(1);
});
