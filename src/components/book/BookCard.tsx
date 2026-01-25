import { Eye } from "lucide-react";

interface Book {
  _id: string;
  coverImage: string;
  title: string;
  pages: number;
  price: number;
  views: number;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-md bg-muted cursor-pointer">
      {/* cover */}
      <img
        src={book.coverImage}
        alt={book.title}
        className="h-full w-full object-cover"
      />

      {/* price badge */}
      <div className="absolute top-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
        {book.price > 0 ? `₹${book.price}` : "Free"}
      </div>

      {/* hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 text-white text-xs">
        <div className="flex items-center gap-1">
          <Eye size={14} />
          <span>{book.views}</span>
        </div>

        {book.pages > 0 && (
          <div>{book.pages} pages</div>
        )}
      </div>
    </div>
  );
}
