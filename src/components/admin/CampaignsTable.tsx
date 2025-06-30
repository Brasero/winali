import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Play } from 'lucide-react';
import {useEffect, useState} from "react";
import {fetchCampaignQuantity, fetchCampaigns} from "@/components/admin/action/campaingAction";
import {TAdminCampaign} from "@/lib/db/types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface Campaign {
    id: string;
    title: string;
    seller: string;
    status: 'en_cours' | 'termine' | 'clos';
    ticketsSold: number;
    ticketsTarget: number;
}

interface CampaignsTableProps {
    onSelectCampaign: (id: string) => void;
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ onSelectCampaign }) => {
    const [campaigns, setCampaigns] = useState<TAdminCampaign[]>([])
    const [campaignQuantity, setCampaignQuantity] = useState(0)
    const pageAmount = campaignQuantity > 0 ? Math.ceil(campaignQuantity / 10) : 1;
    const [page, setPage] = useState(1)
    useEffect(() => {
        fetchCampaigns(page, 10).then(campaigns => {
            console.log('Campaigns fetched:', campaigns);
            setCampaigns(campaigns);
        })
        return () => {
            setCampaigns([]);
        }
    }, [page]);
    useEffect(() => {
        fetchCampaignQuantity().then(quantity => {
            setCampaignQuantity(quantity);
        })
        return () => {
            setCampaignQuantity(0);
            setPage(1);
        }
    }, []);
    // Données d'exemple - à remplacer par un appel API

    const getStatusBadge = (status: Campaign['status']) => {
        const variants = {
            en_cours: { variant: 'default' as const, label: 'En cours' },
            tirage_fait: { variant: 'secondary' as const, label: 'Tirage fait' },
            clos: { variant: 'destructive' as const, label: 'Clos' },
        };

        const { variant, label } = variants[status];
        return <Badge variant={variant}>{label}</Badge>;
    };

    const getProgressPercentage = (sold: number, target: number) => {
        return (sold / target) * 100;
    };

    return (
          <div className="space-y-4">
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Titre</TableHead>
                          <TableHead>Vendeur</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Tickets vendus</TableHead>
                          <TableHead>Actions</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {campaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                            <TableCell className="font-mono text-sm">{campaign.id}</TableCell>
                            <TableCell className="font-medium">{campaign.title}</TableCell>
                            <TableCell>{campaign.seller}</TableCell>
                            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                            <TableCell>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>{campaign.tickets_sold} / {campaign.tickets_target}</span>
                                        <span>{Math.round(getProgressPercentage(campaign.tickets_sold, campaign.tickets_target))}%</span>
                                    </div>
                                    <Progress
                                      value={getProgressPercentage(campaign.tickets_sold, campaign.tickets_target)}
                                      className="h-2"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => onSelectCampaign(campaign.id)}
                                    >
                                        <Eye className="w-4 h-4 mr-1"/>
                                        Détail
                                    </Button>
                                    {campaign.status === 'clos' && (
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        className="bg-brand-coral hover:bg-brand-coral/90 text-white"
                                      >
                                          <Play className="w-4 h-4 mr-1"/>
                                          Forcer tirage
                                      </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
              </Table>
              <Pagination className={"mt-5"}>
                  <PaginationContent>
                      <PaginationPrevious onClick={() => setPage((prev) => prev - 1)} disabled={page === 1} />
                      {Array.from({ length: pageAmount }, (_, index) => (
                          <PaginationItem
                              key={index + 1}
                              onClick={() => setPage(index + 1)}
                          >
                              <PaginationLink isActive={page === index + 1}>
                                  {index + 1}
                              </PaginationLink>
                          </PaginationItem>
                      ))}
                      <PaginationNext onClick={() => setPage((prev) => prev + 1)} disabled={page === pageAmount} />
                  </PaginationContent>
              </Pagination>
          </div>
    );
};

export default CampaignsTable;