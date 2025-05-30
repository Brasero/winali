import {Button} from "@/components/ui/button";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
export default function Home() {
  return (
      <Card className={"m-5"}>
        <CardHeader>Mon titre</CardHeader>
        <CardContent className={"flex flex-col items-center"}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid culpa cupiditate delectus dignissimos ea est ipsa labore laborum magni minima neque nihil perferendis porro provident quam quasi quisquam repudiandae, rerum sed, tempore tenetur ullam vitae! Ab, aliquam aperiam atque dignissimos iste officia quasi quisquam ullam! Blanditiis dolores recusandae rem?</p>
          <CardDescription>
            <p>small description</p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button size={"lg"}>Action</Button>
          </CardAction>
        </CardFooter>
      </Card>
  );
}