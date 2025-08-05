export interface TAdminCampaign {
  id: string;
  title: string;
  seller: string;
  status: "en_cours" | "tirage_fait" | "clos";
  tickets_sold: number;
  tickets_target: number;
}

export interface TAdminTransaction {
  id: string;
  user: string;
  campaign: string;
  type: "payment" | "refund" | "payout";
  amount: number;
  commission_amount: number;
  net_amount: number;
  status: "success" | "failed" | "pending";
  date: string;
}