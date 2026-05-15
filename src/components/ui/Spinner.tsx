// sp'nner
export function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-11 h-11 rounded-full border-3 border-stone-200 border-t-green-700 animate-spin" />
      <p className="text-sm text-stone-500 font-medium">Yükleniyor...</p>
    </div>
  );
}