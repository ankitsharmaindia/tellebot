"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categories } from "@/lib/data";
import { CheckCircle2Icon } from "lucide-react";

const deliveryOptions = [
  { value: "instant", label: "Instant download" },
  { value: "license", label: "License key" },
  { value: "manual", label: "Manual delivery" },
];

export function ListingForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [delivery, setDelivery] = useState<string[]>(["instant"]);
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !category || !price) {
      toast.error("Fill in the title, category, and price to continue.");
      return;
    }
    setSubmitted(true);
    toast.success("Listing published to the VENOM STORE market.");
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card p-10 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2Icon className="size-8" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Your listing is live
          </h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            <span className="font-semibold text-foreground">{title}</span> is
            now visible to buyers. This is a prototype, so it is not persisted —
            but this is exactly how publishing will feel.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => router.push("/merchant/nightshade")}>
            View my storefront
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setTitle("");
              setCategory("");
              setPrice("");
              setSummary("");
            }}>
            List another product
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 md:p-8">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Product title</FieldLabel>
          <Input
            id="title"
            placeholder="e.g. VENOM STORE Analytics Dashboard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FieldDescription>
            Make it specific and benefit-driven.
          </FieldDescription>
        </Field>

        <div className="grid gap-6 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
            <Input
              id="price"
              type="number"
              min="0"
              step="1"
              placeholder="49"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Field>
        </div>

        <FieldSet>
          <FieldLegend>Delivery method</FieldLegend>
          <FieldDescription>
            How buyers receive this product after purchase.
          </FieldDescription>
          <ToggleGroup
            value={delivery}
            onValueChange={(v) => setDelivery(v.length ? v : ["instant"])}
            className="flex-wrap justify-start">
            {deliveryOptions.map((o) => (
              <ToggleGroupItem key={o.value} value={o.value}>
                {o.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="summary">Short description</FieldLabel>
          <Textarea
            id="summary"
            rows={4}
            placeholder="Describe what buyers get and why it is worth it."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/browse")}>
            Cancel
          </Button>
          <Button type="submit">Publish listing</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
