



export default async function Buyer({params}:{params:Promise<{id:string}>}){
  const idTest = "d524ef48-36ee-4152-afd2-cf7b53031518"
  const{id} = await params
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/campaigns?id=${id}`)
  const campaign = (await data.json()).data
  console.log(campaign)
return(
  <>
    <div>
      <div>

      </div>
      <div>
        {idTest}
      </div>
    </div>
    { //description
    }
    <div>

    </div>
  </>
)
}