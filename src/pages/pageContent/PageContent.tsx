import React, { ReactNode } from 'react'
import './pageContent.css'

interface IPageContentProps {
  children: ReactNode
  header?: ReactNode
}

export default function PageContent({ children, header }: IPageContentProps) {
  return <div className="pageContentWrapper">{children}</div>
}
