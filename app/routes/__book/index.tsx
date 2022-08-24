import { Link, Outlet } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <article
      className={`prose mx-auto pt-6 prose-headings:before:pointer-events-none prose-headings:before:invisible
      prose-headings:before:-mt-20 prose-headings:before:block prose-headings:before:h-20 prose-headings:before:content-['_'] sm:prose-sm md:prose-base
      lg:prose-lg lg:ml-[calc((100vw_-_1024px)_*_2/4)] lg:mr-[15.5rem] lg:px-10 xl:ml-[calc((100vw_-_1280px)_*_2/3)]
      2xl:prose-xl 
      2xl:mx-0 2xl:max-w-[50rem]`
        .trim()
        .replace(/\s\s+/g, " ")}
    >
      <p className="lead">
        The Rokugani believe that all of reality is organized into five
        Elements&mdash;Earth, Air, Fire, Water, and Void&mdash;and it is from
        these that the "five rings" of the title are derived. Accordingly, this
        site is divided into five sections, each discussing a different aspect
        of Legend of the Five Rings.
      </p>

      <p>
        The <Link to="/air">Book of Air</Link> contains basic information on the
        world of Rokugan. It includes a brief century-by-century history of the
        Emerald Empire, a discussion of Rokugani culture, beliefs, and customs,
        and specific discussion of the eight Great Clans who dominate the
        Empire's history and conflicts.
      </p>

      <p>
        The <Link to="/earth">Book of Earth</Link> contains the basic rules of the
        game. It explains the fundamental mechanics of playing Legend of the
        Five Rings, including the role and importance of the five Elemental
        Rings, the various die-rolling mechanics, and the essential rules of
        combat, dueling, and other actions.
      </p>

      <p>
        The <Link to="/fire">Book of Fire</Link> contains the basic character creation
        rules and offers detailed discussions of how to make an assortment of
        basic character types from each of the eight Great Clans. It also offers
        a full list of Skills, Advantages, Disadvantages, and Spells for use in
        the game.
      </p>

      <p>
        The <Link to="/water">Book of Water</Link> contains advanced and optional
        rules, rules which the GM and players can decide to use or ignore as
        they please. These rules add more variety and customization options to
        the game. They include information on playing a character from one of
        the Minor Clans or Imperial Families, and a variety of special mechanics
        such as Alternate Paths, Advanced Schools, Kata, Kiho, Ancestors, and
        the sinister secrets of black magic (also known as maho) and the
        Shadowlands Taint.
      </p>

      <p>
        Finally, the <Link to="/void">Book of Void</Link> contains rules and
        information for the GM. There is an extended discussion of different
        ways to construct adventures and campaigns for L5R, as well as rules for
        monsters and natural creatures, a basic selection of such creatures with
        which to challenge the players, and a sample adventure with which to
        start out your Legend of the Five Rings gaming experience.
      </p>
    </article>
  );
}
