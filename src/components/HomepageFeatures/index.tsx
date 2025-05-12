import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Mileston was designed from the ground up to be easily integrated and
        used to get your crypto payments up and running quickly.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Mileston lets you focus on your business, and we&apos;ll handle the
        payments. Go ahead and integrate our API into your application.
      </>
    ),
  },
  {
    title: "Powered by Mileston",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Extend or customize your crypto payment solutions using Mileston's API.
        Mileston can be integrated seamlessly into your existing infrastructure.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4", styles.featureCard)}>
      <div className={clsx("text--center", styles.featureIcon)}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div
        className={clsx(
          "text--center padding-horiz--md",
          styles.featureContent
        )}
      >
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
