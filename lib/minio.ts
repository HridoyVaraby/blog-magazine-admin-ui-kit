/**
 * MinIO / Object Storage Stub
 * 
 * This is a placeholder for object storage (MinIO, S3, etc.)
 * Replace with your preferred storage solution.
 * 
 * To set up MinIO:
 * 1. Run: pnpm add minio
 * 2. Configure your MinIO/S3 credentials
 * 3. Replace this stub with actual client
 */

export const minioClient = {
    // Mock methods to prevent import errors
    putObject: async () => {
        console.warn("MinIO stub: putObject called - implement storage");
        return { etag: "mock-etag" };
    },
    getObject: async () => {
        console.warn("MinIO stub: getObject called - implement storage");
        return null;
    },
    removeObject: async () => {
        console.warn("MinIO stub: removeObject called - implement storage");
    },
} as any;

export const BUCKET_NAME = "your-bucket-name";

export async function uploadFile(file: Buffer, fileName: string) {
    console.warn("MinIO stub: uploadFile called - implement storage");
    return `/placeholder/${fileName}`;
}

export async function deleteFile(fileName: string) {
    console.warn("MinIO stub: deleteFile called - implement storage");
}

export default minioClient;
