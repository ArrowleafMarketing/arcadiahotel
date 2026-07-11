export type PostRecord = {
  id: string;
  site_key: string;

  slug: string;
  title: string;
  excerpt: string;

  content_md: string;

  published_at: string;
  updated_at?: string;
  created_at?: string;

  category_label?: string;
  read_time?: string;
  tags?: string[];

  hero_image_src: string;
  hero_image_alt: string;

  author_name: string;
  author_title: string;
  author_avatar_src: string;
  author_avatar_alt: string;
};
