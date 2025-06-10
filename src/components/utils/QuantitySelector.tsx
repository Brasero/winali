"use client";

import {useState, useEffect, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {loadStripe} from "@stripe/stripe-js";

interface QuantitySelectorProps {
  initial?: number;
  soldTickets: number;
  minTickets: number;
  campaignId:string;
  ticket_price:number;
  allow_overflow:boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function QuantitySelector({
   soldTickets,
   minTickets,
   campaignId,
  ticket_price,
  allow_overflow,
 }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const max = allow_overflow? null : Math.max(minTickets - soldTickets, 0); // Pour éviter un max négatif
  const [isLoading, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const toastId = toast.loading('Achat de tickets en cours')
      let res ;
      try {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL }/auth/campaigns/${campaignId}/tickets`, {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({quantity})
        })
        if(!res.ok){
          const errorData = await res.json();
          toast.error(errorData.error || 'Une erreur est survenue', {
            id: toastId,
            duration:5000,
          })
          return
        }
        const {url} = await res.json();
        const stripe = await stripePromise;
        stripe!.redirectToCheckout({sessionId: new URL(url).pathname.split("/").pop()!}).then((res) => {
            if (res.error) {
                toast.error(res.error.message, {
                id: toastId,
                });
            }
            toast.success('Redirection vers le paiement', {
                id: toastId,
                });
        })
      }
      catch (e){
        toast.error('Une erreur est survenue lors de votre achat.', {
          id:toastId,
        })
        console.error(e)
        return
      }
      finally {
        setQuantity(1)
      }
    })
  }

  useEffect(() => {
    // Si la quantité dépasse le nouveau max, on la rédui
    if(!max) return
    if (quantity > max) {
      setQuantity(max);
    }
  }, [max,quantity]);

  const updateQuantity = (newQty: number) => {
    const qte = max === null ? newQty : newQty <= max ? newQty : max
    if (qte >= 1 ) {
      setQuantity(qte);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 w-full justify-between">
        <Button
          variant={"outline"}
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <Input
          className="w-full text-center"
          value={quantity}
          onChange={(e) => {updateQuantity(Number(e.target.value))}}
        />
        <Button
          variant={"outline"}
          className="disabled:opacity-50"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={max? quantity >= max : false}
        >
          +
        </Button>
      </div>
      <p className={"flex justify-between pt-6"}>
        <span className={"text-sm"}>Total</span>
        <span className={"font-bold"}>{ticket_price * quantity} €</span>
      </p>
      <div>
        <Button onClick={handleSubmit} disabled={isLoading} className={"w-full"}>Acheter des tickets</Button>
      </div>
    </>
  );
}