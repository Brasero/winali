import {Card, CardHeader, CardContent, CardDescription, CardAction} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";

export default function CreateCampaign(){
  return(
    <>
      <div className={"pt-9 hero-gradient p-0 m-0 min-h-screen min-w-screen flex justify-center"}>
        <Card className={"lg:w-[524px] sm:w-full lg:h-[580px] sm:h-full mb-2"}>
          <CardHeader>
            <h1 className={"font-bold"}> Créer une nouvelle campagne</h1>
          </CardHeader>
          <CardContent>
            <Label htmlFor={"title"}>Titre du produit</Label>
            <Input
              className={"mb-5"}
              name={"title"}
              type={"text"}
              id={"title"}
              placeholder={"Ex : Playstation 5"}
              required
            />
            <Label htmlFor={"description"}>Description détaillé</Label>
            <Textarea
              className={"mb-5"}
              name={"description"}
              id={"description"}
              placeholder={"Décriver votre produit en détail..."}
              required
            />
            <Label htmlFor={"image"}>Photos du produit</Label>
            <Input
              className={"mb-5"}
              type={"file"}
              name={"image_urls"}
              id={"image"}
              required
            />
            <CardDescription className={"flex max-sm:flex-col"}>
              <div className={"lg:w-1/2 text-black"}>
                <Label htmlFor={"ticket"}>Prix du ticket (€)</Label>
                <Input
                  className={"mb-5"}
                  type={"text"}
                  name={"ticket_price"}
                  id={"ticket"}
                  placeholder={"Ex : 5€"}
                  required
                />
              </div>
              <div className={"lg:w-1/2 lg:ml-2 text-black"}>
                <Label htmlFor={"min_tickets"}>Nombre minimum de tickets</Label>
                <Input
                  className={"mb-5"}
                  type={"text"}
                  name={"min_tickets"}
                  id={"min_tickets"}
                  placeholder={"Ex : 10"}
                  required
                />
              </div>
            </CardDescription>
            <Label htmlFor={"end_date"}>Date de fin</Label>
            <Input
              className={"mb-5"}
              type={"date"}
              name={"end_date"}
              id={"end_date"}
              required
            />
            <CardAction className={"flex mb-5"}>
              <Checkbox id={"objectif"}/>
              <Label htmlFor={"objectif"} className={"pl-2"}> Autoriser le dépassement de l&apos;objective</Label>
            </CardAction>
            <CardAction>
              <Button className={"w-full"}>Créer la vente</Button>
            </CardAction>
          </CardContent>
        </Card>
      </div>
    </>
  )
}