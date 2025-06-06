import CampaignImage from "@/components/shared/CampaignImage";
import {Progress} from "@/components/ui/progress"
import {Card, CardDescription, CardTitle} from "@/components/ui/card";

export default async function Buyer({params}:{params:Promise<{id:string}>}){
  const idTest = "d524ef48-36ee-4152-afd2-cf7b53031518"
  const{id} = await params
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/campaigns?id=${id}`)
  const campaign = (await data.json()).data
  console.log(campaign)
return(
  <div className={"w-full"}>
    <div className={"flex w-1/2"}>
      <div className={"w-[541px] h-[537px] gap-16 pt-17 pr-15 pl-15 pb-17 "}>
        <CampaignImage images={campaign.image_urls}/>
      </div>
      <div className={"w-1/2"}>
        <h1>{campaign.title}</h1>
        <p>Vendu par {campaign.user.first_name} {campaign.user.last_name}</p>
        <div className={"flex justify-between"}>
          <p>Progression</p>
          <p>33%</p>
        </div>
        <Progress value={33}/>
        <div className={"flex justify-between"}>
          <p>260 tickets vendus</p>
          <p>Objectif : {campaign.min_tickets}</p>
        </div>
        <Card>
          <CardTitle>
            Achat de tickets
          </CardTitle>
          <CardDescription className={"flex justify-between"}>
            <div>
              <p className={"font-bold text-black"}>{campaign.ticket_price} €</p>
              <p>par ticket</p>
            </div>
            <div>
              <p>Fin de la vente</p>
              <p className={"font-bold text-black"}>{campaign.end_date}</p>
            </div>
          </CardDescription>
        </Card>
      </div>
    </div>
    <div>
      <h1 className={"font-bold"}>Déscription</h1>
      <p>{campaign.description}</p>
      {idTest}
    </div>
  </div>
)
}