"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();

  // Initialize form fields; you can expand or reduce as needed.
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [sku, setSku] = useState(initialData?.sku || "");
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [category, setCategory] = useState(initialData?.category || ""); // This should be an ID if you have categories in DB

  // price is an object: { regular, sale, discountPercentage }
  const [regularPrice, setRegularPrice] = useState(
    initialData?.price?.regular || 0
  );
  const [salePrice, setSalePrice] = useState(initialData?.price?.sale || 0);
  const [discountPercentage, setDiscountPercentage] = useState(
    initialData?.price?.discountPercentage || 0
  );

  // inventory is an object: { stock, warehouses: [{ location, quantity }, ...] }
  // For simplicity, let's just handle one warehouse in the UI.
  // You can expand or make it dynamic if needed.
  const [stock, setStock] = useState(initialData?.inventory?.stock || 0);
  const [warehouseLocation, setWarehouseLocation] = useState(
    initialData?.inventory?.warehouses?.[0]?.location || ""
  );
  const [warehouseQuantity, setWarehouseQuantity] = useState(
    initialData?.inventory?.warehouses?.[0]?.quantity || 0
  );

  // attributes can be any JSON object. We'll just store it as a string for demonstration
  // and let the user type in JSON if desired.
  const [attributes, setAttributes] = useState(
    JSON.stringify(initialData?.attributes || {})
  );

  // Seller object: { name, address, email, contact }
  const [sellerName, setSellerName] = useState(initialData?.seller?.name || "");
  const [sellerAddress, setSellerAddress] = useState(
    initialData?.seller?.address || ""
  );
  const [sellerEmail, setSellerEmail] = useState(
    initialData?.seller?.email || ""
  );
  const [sellerContact, setSellerContact] = useState(
    initialData?.seller?.contact || ""
  );

  // status can be "active" or "inactive"
  const [status, setStatus] = useState(initialData?.status || "active");

  // File upload (media). We'll allow one file as an example:
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Construct the nested objects
      const priceObj = {
        regular: Number(regularPrice),
        sale: Number(salePrice) || undefined,
        discountPercentage: Number(discountPercentage) || undefined,
      };

      const inventoryObj = {
        stock: Number(stock),
        warehouses: [
          {
            location: warehouseLocation,
            quantity: Number(warehouseQuantity),
          },
        ],
      };

      // Convert attributes from string to object if user typed JSON
      let attributesObj;
      try {
        attributesObj = attributes ? JSON.parse(attributes) : {};
      } catch {
        attributesObj = {};
      }

      const sellerObj = {
        name: sellerName,
        address: sellerAddress,
        email: sellerEmail,
        contact: sellerContact,
      };

      // Prepare multipart form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("sku", sku);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("price", JSON.stringify(priceObj));
      formData.append("inventory", JSON.stringify(inventoryObj));
      formData.append("attributes", JSON.stringify(attributesObj));
      formData.append("seller", JSON.stringify(sellerObj));
      formData.append("status", status);

      // If a file was selected, append it to formData.
      // On the backend, you typically read it via `req.file`.
      if (selectedFile) {
        // "file" or "media" or whichever field name your controller/multer expects:
        formData.append("image", selectedFile);
      }

      const method = initialData ? "PUT" : "POST";
      // If you're updating an existing product, you'll need its ID in the URL
      const url = initialData
        ? `http://localhost:8001/api/products/${initialData.id}`
        : "http://localhost:8001/api/products";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        // If successful, go back or redirect to product listing
        router.push("/products");
      } else {
        console.error("Error saving product:", await response.text());
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
      encType="multipart/form-data" // Important for file uploads
    >
      {/* Basic Product Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">
          Product Information
        </h2>

        {/* Name, SKU, Brand */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">SKU *</label>
            <input
              type="text"
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="form-label">Category (ObjectId)</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
            placeholder="e.g. 64f5c0d9da..."
          />
        </div>

        {/* Description */}
        <div>
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input h-28"
          />
        </div>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Pricing</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Regular Price *</label>
            <input
              type="number"
              step="0.01"
              value={regularPrice}
              onChange={(e) => setRegularPrice(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="form-label">Sale Price</label>
            <input
              type="number"
              step="0.01"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Discount %</label>
            <input
              type="number"
              step="0.01"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Inventory</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Total Stock *</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="form-label">Warehouse Location</label>
            <input
              type="text"
              value={warehouseLocation}
              onChange={(e) => setWarehouseLocation(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Warehouse Quantity</label>
          <input
            type="number"
            value={warehouseQuantity}
            onChange={(e) => setWarehouseQuantity(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {/* Attributes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">
          Attributes (JSON)
        </h3>
        <textarea
          value={attributes}
          onChange={(e) => setAttributes(e.target.value)}
          className="form-input h-28"
        />
        <p className="text-sm text-gray-500">
          Enter valid JSON for product attributes. Example:
          <br />
          <code>{`{"color": "red", "size": "XL"}`}</code>
        </p>
      </div>

      {/* Seller Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">
          Seller Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Seller Name *</label>
            <input
              type="text"
              required
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Seller Address</label>
            <input
              type="text"
              value={sellerAddress}
              onChange={(e) => setSellerAddress(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Seller Email</label>
            <input
              type="email"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Seller Contact</label>
            <input
              type="text"
              value={sellerContact}
              onChange={(e) => setSellerContact(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* File Upload for Media */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Media</h3>
        <p className="text-sm text-gray-500">
          Upload an image or video file. (Controller expects{" "}
          <code>req.file</code>
          .)
        </p>
        <input
          type="file"
          onChange={(e) =>
            setSelectedFile(e.target.files ? e.target.files[0] : null)
          }
          className="form-input"
        />
      </div>

      {/* Submit */}
      <div className="flex gap-4 mt-6">
        <button type="submit" className="btn-primary">
          {initialData ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
