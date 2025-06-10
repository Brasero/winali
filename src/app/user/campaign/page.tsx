'use client'
import React, {useState} from "react";
import {Card, CardHeader, CardContent, CardDescription, CardAction} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import ImagePreview from "@/components/shared/ImagePreview";
import {addCampaignSchema} from "@/lib/zod";
import {ZodErrors} from "@/components/utils/ZodErrors";
import {toast} from "sonner";
import {useSession} from "next-auth/react";
import {toBase64Array} from "@/lib/image";
import {useRouter} from "next/navigation";


type CampaignData = {
  title:string;
  description:string;
  image_urls:FileList;
  ticket_price:string;
  min_tickets:string;
  allow_overflow:boolean;
  end_date:string;
}
type FieldName = "title" | "description" | "image_urls" | "ticket_price" | "min_tickets" | "allow_overflow" | "end_date"

type ErrorFields = {
  [key in FieldName]?: {
    _errors: string[] | string;
  };
}

export default function CreateCampaign(){
  const session = useSession();
  const router = useRouter()
  const [campaign, setCampaign]= useState<CampaignData>({
    title:"",
    description:"",
    image_urls:{} as FileList,
    ticket_price:"",
    min_tickets:"",
    allow_overflow:false,
    end_date:"",
  })
  const [errors, setErrors] = useState({} as ErrorFields);
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if(fileList && fileList.length > 0){
      setCampaign({
        ...campaign,
        image_urls: fileList,
      })
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => {
    const {value} = e.target
    const name : FieldName = e.target.name as FieldName

    if(name === "allow_overflow"){
      setCampaign({
        ...campaign,
        allow_overflow: !campaign.allow_overflow
      })
      return
    }
    const result = addCampaignSchema.safeParse({...campaign,[name]:value})
    if(!result.success){
      const formatted = result.error.format();
      setErrors({
        ...errors,
        [name]: formatted[name] || ""
      })
    }else {
      setErrors({} as ErrorFields)
    }
    setCampaign({
      ...campaign,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    if(!session.data || !session.data.user){
      toast.error("Vous devez être connecté pour créer une campagne")
      return
    }
    setIsLoading(true)
    const safe = addCampaignSchema.safeParse(campaign)
    if (!safe.success){
      setErrors(safe.error.format())
      setIsLoading(false)
      return
    }
    const toastId = toast.loading("Création de votre campagne en cours ...")
    setErrors({} as ErrorFields)
    try {
      const images = Array.from(campaign.image_urls) as Array<File>;
      const base64Images = await toBase64Array(images);
      const result = await fetch("/api/auth/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...campaign,
            image_urls: base64Images,
        }),
      })
      if (!result.ok) {
        const errorData = await result.json();
        toast.error(errorData.error || "Une erreur est survenue", {id: toastId, duration: 5000, description: "Veuillez vérifier vos informations et réessayer."});
        return;
      }
      const {campaignId} = await result.json();
      //const response = await result.json(); // contient l'id de la campagne créée
        toast.success("Votre campagne a été créée avec succès", {id: toastId})
        setCampaign({
          title: "",
          description: "",
          image_urls: {} as FileList,
          ticket_price: "",
          min_tickets: "",
          allow_overflow: false,
          end_date: "",
        })
        router.push(`/campaigns/${campaignId}`) // Redirection vers la page de la campagne créée
        // todo redirect to the campaign page
    } catch (e) {
        toast.error("Une erreur est survenue lors de la création de votre campagne", {id: toastId})
        console.error(e)
        return
    } finally {
      setIsLoading(false);
    }
  }
  return(
    <>
      <div className={"pt-9 hero-gradient p-0 m-0 pb-9 min-w-screen flex justify-center items-start"}>
        <Card className={"md:max-w-[524px] w-full  mb-2"}>
          <CardHeader>
            <h1 className={"font-bold"}> Créer une nouvelle campagne</h1>
          </CardHeader>
          <CardContent>
            <Label className={"mb-1"} htmlFor={"title"}>Titre du produit</Label>
            <Input
              className={"mb-5"}
              name={"title"}
              type={"text"}
              id={"title"}
              placeholder={"Ex : Playstation 5"}
              value={campaign.title}
              onChange={handleChange}
              required
            />
            <ZodErrors error={errors.title?._errors} />
            <Label className={"mb-1"} htmlFor={"description"}>Description détaillé</Label>
            <Textarea
              className={"mb-5"}
              name={"description"}
              id={"description"}
              placeholder={"Décriver votre produit en détail..."}
              value={campaign.description}
              onChange={handleChange}
              required
            />
            <ZodErrors error={errors.description?._errors} />
            <Label className={"mb-1"} htmlFor={"image"}>Photos du produit</Label>
            <Input
              className={"mb-5"}
              multiple={true}
              type={"file"}
              name={"image_urls"}
              id={"image"}
              onChange={handleFileChange}
              accept={"image/*"}
              required
            />
            <ZodErrors error={errors.image_urls?._errors} />
            <ImagePreview files={campaign.image_urls}/>
            <CardDescription className={"flex max-sm:flex-col"}>
              <div className={"md:w-1/2 text-black"}>
                <Label className={"mb-1"} htmlFor={"ticket"}>Prix du ticket (€)</Label>
                <Input
                  className={"mb-5"}
                  type={"text"}
                  name={"ticket_price"}
                  id={"ticket"}
                  placeholder={"Ex : 5€"}
                  value={campaign.ticket_price}
                  onChange={handleChange}
                  required
                />
                <ZodErrors error={errors.title?._errors} />
              </div>
              <div className={"md:w-1/2 md:ml-2 text-black"}>
                <Label className={"mb-1"} htmlFor={"min_tickets"}>Nombre minimum de tickets</Label>
                <Input
                  className={"mb-5"}
                  type={"text"}
                  name={"min_tickets"}
                  id={"min_tickets"}
                  placeholder={"Ex : 10"}
                  value={campaign.min_tickets}
                  onChange={handleChange}
                  required
                />
                <ZodErrors error={errors.min_tickets?._errors} />
              </div>
            </CardDescription>
            <Label className={"mb-1"} htmlFor={"end_date"}>Date de fin</Label>
            <Input
              className={"mb-5"}
              type={"date"}
              name={"end_date"}
              id={"end_date"}
              value={campaign.end_date}
              onChange={handleChange}
              required
            />
            <ZodErrors error={errors.end_date?._errors} />
            <CardAction className={"flex mb-5"}>
              <Input
                type={"checkbox"}
                className={"w-fit"}
                checked={campaign.allow_overflow}
                onChange={handleChange}
                name={"allow_overflow"}
                id={"objectif"}/>
              <Label htmlFor={"objectif"} className={"pl-2"}> Autoriser le dépassement de l&apos;objective</Label>
            </CardAction>
            <CardAction>
              <Button onClick={handleSubmit} disabled={isLoading} className={"w-full"}>Créer la vente</Button>
            </CardAction>
          </CardContent>
        </Card>
      </div>
    </>
  )
}