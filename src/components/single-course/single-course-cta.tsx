import { Button } from "../ui/button";

const SingleCourseCTA = ({
  price,
  title,
}: {
  price: number;
  title: string;
}) => {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-border p-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for {title}?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        Join thousands of developers who&apos;ve transformed their React skills with
        this comprehensive course
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-base">
          Enroll Now - ৳{price}
        </Button>
        <Button variant="outline" className="px-8 py-6 text-base">
          Try Free Preview
        </Button>
      </div>
    </section>
  );
};

export default SingleCourseCTA;
