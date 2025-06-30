export interface TAdminCampaign {
  id: string;
  title: string;
  seller: string;
  status: "en_cours" | "tirage_fait" | "clos";
  tickets_sold: number;
  tickets_target: number;
}