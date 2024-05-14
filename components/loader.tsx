import Image from "next/image";
export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <div className="text-muted-foreground text-sm text-center animate-pulse">
        Genius is thinking...
      </div>
    </div>
  );
};
