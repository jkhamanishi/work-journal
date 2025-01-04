// Derived from vite-plugin-svgr/client.d.ts

type ViteSVGElement = React.FunctionComponent<
  React.ComponentProps<"svg"> & { title?: string }
>;

declare module "*.svg" {
  const ReactComponent: ViteSVGElement
  export default ReactComponent;
}

declare module "vite-svg" {
  export default ViteSVGElement;
}