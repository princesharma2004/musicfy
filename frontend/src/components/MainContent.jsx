import Songs from './Songs'

export default function MainContent() {
  return (
    <main className="flex flex-1 bg-black text-white overflow-y-auto p-6">
      <Songs />
    </main>
  )
}