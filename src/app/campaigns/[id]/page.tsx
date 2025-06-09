import CampaignImage from "@/components/shared/CampaignImage";
import {Progress} from "@/components/ui/progress"
import {Card, CardAction, CardDescription, CardTitle} from "@/components/ui/card";
import QuantitySelector from "@/components/utils/QuantitySelector";

export default async function Buyer({params}:{params:Promise<{id:string}>}){
  const{id} = await params
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/campaigns?id=${id}`)
  const campaign = (await data.json()).data
  const pourcent = Math.round((campaign.ticket_sells / campaign.min_tickets) * 100)
  console.log(campaign)
return(
  <div className={"w-full"}>
    <div className={"flex justify-center align-start"}>
      <div className={"w-[541px] pb-17 px-15 "}>
        <CampaignImage images={campaign.image_urls}/>
      </div>
      <div className={"w-1/2 flex flex-col gap-[10px]"}>
        <h1 className={"font-bold text-2xl"}>{campaign.title}</h1>
        <p className={"text-muted-foreground"}>Vendu par {campaign.user.first_name} {campaign.user.last_name}</p>
        <div className={"flex justify-between pt-6"}>
          <p>Progression</p>
          <p>{pourcent} %</p>
        </div>
        <Progress value={pourcent}/>
        <div className={"flex justify-between"}>
          <p>{campaign.ticket_sells} tickets vendus</p>
          <p>Objectif : {campaign.min_tickets} tickets</p>
        </div>
        <Card className={"p-6 gap-6"}>
          <CardTitle className={"text-2xl"}>
            Achat de tickets
          </CardTitle>
          <CardDescription className={"flex justify-between"}>
            <div>
              <p className={"font-bold text-black text-xl"}>{parseInt(campaign.ticket_price).toFixed()} €</p>
              <p>par ticket</p>
            </div>
            <div>
              <p>Fin de la vente</p>
              <p className={"font-bold text-black"}>{new Date(campaign.end_date).toLocaleDateString()}</p>
            </div>
          </CardDescription>

          <CardAction className={'self-stretch'}>
            <p>{campaign.min_tickets - campaign.ticket_sells > 0 ? `Il reste ${campaign.min_tickets - campaign.ticket_sells} tickets avant objectif.` : campaign.allow_overflow? `Objectif atteint, les ventes restent ouverte jusqu'au ${new Date(campaign.end_date).toLocaleDateString()}.` : `Objectif atteint, les ventes de tickets sont fermé.` }</p>
            <QuantitySelector campaignId={campaign.id} ticket_price={campaign.ticket_price} allow_overflow={campaign.allow_overflow} soldTickets={campaign.ticket_sells} minTickets={campaign.min_tickets} />
          </CardAction>
        </Card>
      </div>
    </div>
    <div>
      <h1 className={"font-bold"}>Déscription</h1>
      <p>{campaign.description}</p>
    </div>
  </div>
)
}