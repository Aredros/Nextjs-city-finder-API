/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DistanceContainer from "../../../containers/DistanceContainer";
import Link from "next/link";
import Django from "../Djangocircle.png";
import Head from "next/head";

export default function Distance() {
  return (
    <>
      <Head>
        <title>Sopra Next Project</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <main className="flex min-h-screen flex-col items-center py-24 px-2 lg:px-20 bg-gradient-to-br from-purple-900 via-blue-700 to-indigo-900">
        <div className="w-11/12 lg:w-[750px]">
          <div className="mb-10 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <Image
              className="w-[50px] lg:w-[100px] m-auto"
              src={Django}
              alt="Picture of the author"
              height={100}
            />
            <Link
              href="/#"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Top 10s{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Top 10 of cities with data
              </p>
            </Link>
            <Link
              href="/distance"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Distances{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Find the distance between one city and another
              </p>
            </Link>
          </div>
          <div className="mt-10 w-full">
            <h1 className="text-left font-medium">
              <b className="text-6xl colored-text-temp bg-gradient-to-r from-[#FF3EAD] via-[#FFAC1E] to-[#FF933E]">
                DISTANCES
              </b>
            </h1>

            <DistanceContainer />
          </div>

          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Sopra Banking
            </p>
            <div className="fixed bottom-0 left-0 flex h-42 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <div className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
                By <h3>Jose (CHEO) Molina</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
