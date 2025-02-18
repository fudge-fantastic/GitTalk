import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ratione quasi sunt voluptatum nemo consequuntur iure beatae nulla, libero tenetur. Eligendi, nesciunt nobis placeat labore illum tenetur consectetur rerum nostrum?
    </div>
  );
}
