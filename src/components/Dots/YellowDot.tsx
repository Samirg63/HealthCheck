const YellowDot = ({title}:{title:string}) => {
  return (
    <div data-testid="yellowDot" title={`No ${title} Detected`} className="bg-yellow-400/60 w-4 h-4 rounded-full ml-8"></div>
  )
}

export default YellowDot