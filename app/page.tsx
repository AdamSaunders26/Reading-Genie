import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-between h-[100vh] border-2 border-pink-500">
      <div className=" border-2 border-red-500 m-4">Settings box</div>
      <section className="h-[50%] overflow-scroll flex flex-col gap-4 justify-between border-2 border-blue-500 m-4">
        <div className=" border-2 border-green-500 m-4 h-14">AI</div>
        <div className=" border-2 border-green-500 m-4 h-14">Timmy</div>
        <div className=" border-2 border-green-500 m-4 h-14">Timmy</div>
        <div className=" border-2 border-green-500 m-4 h-14">Timmy</div>
        <div className=" border-2 border-green-500 m-4 h-14">Timmy</div>
        <div className=" border-2 border-green-500 m-4 h-14">Timmy</div>
        <div className=" border-2 border-green-500 m-4 h-14">Timmy</div>
      </section>
    </main>
  );
}
