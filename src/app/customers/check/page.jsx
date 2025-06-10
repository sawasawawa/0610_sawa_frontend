"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default function ReadPage() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CustomerContent />
    </Suspense>
  );
}

function CustomerContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("customer_id");
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const loadCustomer = async () => {
      if (id) {
        const data = await fetchCustomer(id);
        setCustomerInfo(data);
      }
    };
    loadCustomer();
  }, [id]);

  if (!customerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
