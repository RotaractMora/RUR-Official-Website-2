"use client";

import DOMPurify from 'dompurify';

const CodeEvelPara = ({ htmlContent }:{htmlContent:string}) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent, { ALLOWED_TAGS: ['br', 'strong' , 'b' , 'h1','h2','h3','h4','h5','h6','i','u'] });
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default CodeEvelPara;