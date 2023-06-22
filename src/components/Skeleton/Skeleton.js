import React from "react"
import ContentLoader from "react-content-loader"

const MessageSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={150}
    height={75}
    viewBox="0 0 150 75"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="15" ry="15" width="150" height="52" />
  </ContentLoader>
)

export default MessageSkeleton;