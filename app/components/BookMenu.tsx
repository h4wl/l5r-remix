import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type MenuItem = {
    Title: string;
    Path: string;
    Children?: MenuItem[]
}

type Menu = {
    MenuItems: MenuItem[]   
}

export async function loader({ request }: LoaderArgs) {
    const menu : Menu = {
        "MenuItems": [
          {
            "Title": "Book of Air",
            "Path": "/book-of-air",
            "Children": [
              {
                "Title": "History",
                "Path": "/history"
              },
              {
                "Title": "Geography",
                "Path": "/geography"
              },
              {
                "Title": "Map",
                "Path": "/map"
              },
              {
                "Title": "Religion",
                "Path": "/religion"
              },
              {
                "Title": "Bushido",
                "Path": "/bushido"
              },
              {
                "Title": "People",
                "Path": "/people"
              }
            ]
          },
          {
            "Title": "Book of Earth",
            "Path": "/book-of-earth",
            "Children": [
              {
                "Title": "Rolls",
                "Path": "/rolls"
              },
              {
                "Title": "Traits",
                "Path": "/traits"
              },
              {
                "Title": "Combat",
                "Path": "/combat"
              }
            ]
          },
          {
            "Title": "Book of Fire",
            "Path": "/book-of-fire",
            "Children": [
              {
                "Title": "Character Creation",
                "Path": "/character-creation"
              },
              {
                "Title": "Families",
                "Path": "/families"
              },
              {
                "Title": "Schools",
                "Path": "/schools"
              },
              {
                "Title": "Advantages",
                "Path": "/advantages"
              },
              {
                "Title": "Disadvantages",
                "Path": "/disadvantages"
              },
              {
                "Title": "Skills",
                "Path": "/skills"
              },
              {
                "Title": "Equipment",
                "Path": "/equipment"
              },
              {
                "Title": "Magic",
                "Path": "/magic"
              },
              {
                "Title": "Universal Spells",
                "Path": "/universal-spells"
              },
              {
                "Title": "Air Spells",
                "Path": "/air-spells"
              },
              {
                "Title": "Earth Spells",
                "Path": "/earth-spells"
              },
              {
                "Title": "Fire Spells",
                "Path": "/fire-spells"
              },
              {
                "Title": "Water Spells",
                "Path": "/water-spells"
              },
              {
                "Title": "Void Spells",
                "Path": "/void-spells"
              }
            ]
          },
          {
            "Title": "Book of Water",
            "Path": "/book-of-water",
            "Children": [
              {
                "Title": "Mass Battle",
                "Path": "/battle"
              },
              {
                "Title": "Ancestors",
                "Path": "/ancestors"
              },
              {
                "Title": "Heritage",
                "Path": "/heritage"
              },
              {
                "Title": "Kata",
                "Path": "/katas"
              },
              {
                "Title": "Kiho",
                "Path": "/kiho"
              },
              {
                "Title": "Maho",
                "Path": "/maho"
              },
              {
                "Title": "Shadowlands Taint",
                "Path": "/shadowlands-taint"
              }
            ]
          },
          {
            "Title": "Book of Void",
            "Path": "/book-of-the-void",
            "Children": [
              {
                "Title": "Multi-Elemental Spells",
                "Path": "/multi-elemental-spells"
              },
              {
                "Title": "The Nothing",
                "Path": "/the-nothing"
              },
              {
                "Title": "Nezumi",
                "Path": "/nezumi"
              },
              {
                "Title": "Naga",
                "Path": "/naga"
              },
              {
                "Title": "Tsuno",
                "Path": "/tsuno"
              },
              {
                "Title": "Legend of the Burning Sands",
                "Path": "/legend-of-the-burning-sands"
              },
              {
                "Title": "Playable Returned Spirits",
                "Path": "/playable-returned-spirits"
              },
              {
                "Title": "Tokugi (Unofficial)",
                "Path": "/tokugi"
              }
            ]
          }
        ]
      }
    return json(menu);
  }

export default function BookMenu({ }) {
    const data = useLoaderData<typeof loader>();

    return (
    <div>
        {data.MenuItems.map((item, idx) =>
            <div>{item.Title}</div>
        )}
    </div>
  );
}



  