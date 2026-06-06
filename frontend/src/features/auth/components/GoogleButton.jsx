

const googleButton = () => {
  return (
  <a
  href="/api/auth/google"
  className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition font-medium"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</a>
  )
}

export default googleButton
