'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateCategoryPage() {
    const router = useRouter();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
    });

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-\u0980-\u09FF]+/g, '') // Keep Bangla characters
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');

        setFormData({ ...formData, name, slug });
    };

    const createMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create category');
            }
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: 'সফল!',
                description: 'নতুন ক্যাটেগরি তৈরি হয়েছে।',
            });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            router.push('/admin/categories');
        },
        onError: (error: Error) => {
            toast({
                title: 'ত্রুটি',
                description: error.message,
                variant: 'destructive',
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast({
                title: 'ত্রুটি',
                description: 'ক্যাটেগরির নাম আবশ্যক।',
                variant: 'destructive',
            });
            return;
        }

        if (!formData.slug.trim()) {
            toast({
                title: 'ত্রুটি',
                description: 'স্লাগ আবশ্যক।',
                variant: 'destructive',
            });
            return;
        }

        createMutation.mutate(formData);
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/categories">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            ফিরে যান
                        </Link>
                    </Button>
                    <span>নতুন ক্যাটেগরি</span>
                </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">ক্যাটেগরির নাম *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="যেমন: জাতীয়, আন্তর্জাতিক, খেলাধুলা"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">স্লাগ (URL) *</Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="category-slug"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            URL-এ ব্যবহার হবে। যেমন: /category/your-slug
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">বিবরণ (ঐচ্ছিক)</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="ক্যাটেগরি সম্পর্কে সংক্ষিপ্ত বিবরণ"
                            rows={3}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/admin/categories')}
                    >
                        বাতিল
                    </Button>
                    <Button
                        type="submit"
                        disabled={createMutation.isPending}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {createMutation.isPending ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
