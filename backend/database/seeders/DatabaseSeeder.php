<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use App\Models\SiteContent;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Default Administrator Account (No public registration)
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@smschool.co.in')],
            [
                'name' => 'SM School Administrator',
                'password' => env('ADMIN_PASSWORD', 'SmSchool@2026'),
                'is_admin' => true,
                'role' => 'super_admin',
            ]
        );

        // 2. Gallery Categories
        $categoriesData = [
            [
                'name' => 'School Events',
                'slug' => 'school-events',
                'description' => 'Morning assemblies, inter-house quizzes, and school-wide gatherings at SM English School.',
            ],
            [
                'name' => 'Classroom Activities',
                'slug' => 'classroom-activities',
                'description' => 'Interactive lessons, Montessori materials, reading corners, and collaborative projects.',
            ],
            [
                'name' => 'Sports',
                'slug' => 'sports',
                'description' => 'Volleyball, throwball, athletics, yoga, karate, and outdoor physical education.',
            ],
            [
                'name' => 'Cultural Activities',
                'slug' => 'cultural-activities',
                'description' => 'Music, dance, art & craft, puppetry, and creative student showcases.',
            ],
            [
                'name' => 'Celebrations',
                'slug' => 'celebrations',
                'description' => 'Festivals, World Environment Day, Dussehra, and National Day celebrations.',
            ],
            [
                'name' => 'Learning Activities',
                'slug' => 'learning-activities',
                'description' => 'Mathematical Magic, Abacus, STEM robotics, gardening, and hands-on science.',
            ],
            [
                'name' => 'School Facilities',
                'slug' => 'school-facilities',
                'description' => 'Library, science laboratory, audio-visual rooms, classrooms, and campus spaces.',
            ],
        ];

        $slugToCategory = [];
        foreach ($categoriesData as $cat) {
            $model = GalleryCategory::updateOrCreate(
                ['slug' => $cat['slug']],
                [
                    'name' => $cat['name'],
                    'description' => $cat['description'],
                ]
            );
            $slugToCategory[$cat['slug']] = $model;
        }

        // 3. Seed Authentic Crawled SM English School Gallery Photographs
        $seedFile = database_path('seeders/gallery_seed.json');
        if (file_exists($seedFile) && GalleryImage::count() === 0) {
            $items = json_decode(file_get_contents($seedFile), true) ?? [];
            foreach ($items as $item) {
                $catSlug = $item['category_slug'] ?? 'school-events';
                $category = $slugToCategory[$catSlug] ?? null;

                GalleryImage::create([
                    'title' => $item['title'],
                    'description' => $item['description'] ?? '',
                    'image_url' => $item['image_url'],
                    'storage_path' => $item['storage_path'] ?? '',
                    'category_id' => $category?->id,
                    'is_featured' => (bool) ($item['is_featured'] ?? false),
                    'is_published' => (bool) ($item['is_published'] ?? true),
                    'display_order' => (int) ($item['display_order'] ?? 0),
                ]);
            }
        }

        // 4. Default Editable Site Content Blocks
        $contentBlocks = [
            [
                'section_key' => 'hero',
                'title' => "Where Every Child's Journey Begins.",
                'subtitle' => 'SM Education Society • Est. 1965 • Hoodi, Bangalore',
                'body' => 'We invite you to be a part of this journey — by learning with us, by contributing in thought and spirit, and by sharing your learning experiences.',
            ],
            [
                'section_key' => 'welcome',
                'title' => 'Welcome to SM School',
                'subtitle' => 'Nurturing Young Minds Since 1965',
                'body' => 'SM Education Society, established in 1965 by late Dr. Nazir Ahmed, founded SM English School in 1985 to provide effective, affordable, and holistic quality education blending the best of Montessori and traditional learning.',
            ],
            [
                'section_key' => 'admissions_banner',
                'title' => "Begin Your Child's Learning Journey at SMES",
                'subtitle' => 'Visit our Hoodi campus or send an admission enquiry',
                'body' => 'Connect with our school office Monday to Saturday between 8:00 AM and 4:00 PM to learn more about our programs and campus.',
            ],
        ];

        foreach ($contentBlocks as $block) {
            SiteContent::updateOrCreate(
                ['section_key' => $block['section_key']],
                [
                    'title' => $block['title'],
                    'subtitle' => $block['subtitle'],
                    'body' => $block['body'],
                ]
            );
        }
    }
}
