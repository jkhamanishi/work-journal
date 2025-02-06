// Derived from vite-plugin-svgr/client.d.ts

declare type ViteSVGElement = React.FunctionComponent<
  React.ComponentProps<"svg"> & { title?: string }
>;

declare module "*.svg" {
  const ReactComponent: ViteSVGElement
  export default ReactComponent;
}