import { APIS } from "@/data/apis";
import { CATEGORIES } from "@/data/categories";
import { ApiExplorer } from "@/components/ApiExplorer";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { q, category } = await searchParams;

  return (
    <ApiExplorer
      apis={APIS}
      categories={CATEGORIES}
      initialQuery={q ?? ""}
      initialCategory={category ?? "all"}
    />
  );
}
