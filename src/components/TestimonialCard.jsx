import { Quote } from "lucide-react";

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <Quote className="text-primary mb-4" />
      <p className="text-gray-700">{quote}</p>
      <p className="text-sm text-gray-400 mt-2">{author}</p>
    </div>
  );
}

export default TestimonialCard;
