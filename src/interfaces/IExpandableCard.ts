export interface IExpandableCard {
    description: string;
    title: string;
    src: string;
    ctaText: string;
    ctaLink: string;
    content: () => React.JSX.Element;
  }