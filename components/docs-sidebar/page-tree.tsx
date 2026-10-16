import { useTreeContext, useTreePath } from "@fumadocs/base-ui/contexts/tree";
import { type FC, Fragment, type ReactNode, createContext, use, useMemo } from "react";
import type * as PageTree from "fumadocs-core/page-tree";
import type * as Base from "./base";
import { usePathname } from "fumadocs-core/framework";
import { isActive } from "../../lib/urls";
import { FileCode2 } from "lucide-react";

export interface SidebarPageTreeComponents {
  Item: FC<{ item: PageTree.Item }>;
  Folder: FC<{ item: PageTree.Folder; children: ReactNode }>;
  Separator: FC<{ item: PageTree.Separator }>;
}

const RendererContext = createContext<
  | (Partial<SidebarPageTreeComponents> & {
      pathname: string;
    })
  | null
>(null);

type InternalComponents = Pick<
  typeof Base,
  | "SidebarSeparator"
  | "SidebarFolder"
  | "SidebarFolderLink"
  | "SidebarFolderContent"
  | "SidebarFolderTrigger"
  | "SidebarItem"
>;

export function createPageTreeRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarSeparator,
  SidebarItem,
}: InternalComponents) {
  function renderList(nodes: PageTree.Node[]) {
    return nodes.map((node, i) => <PageTreeNode key={i} node={node} />);
  }

  function PageTreeNode({ node }: { node: PageTree.Node }) {
    const { Separator, Item, Folder, pathname } = use(RendererContext)!;

    if (node.type === "separator") {
      if (Separator) return <Separator item={node} />;
      return (
        <SidebarSeparator>
          {node.icon}
          {node.name}
        </SidebarSeparator>
      );
    }

    if (node.type === "folder") {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- assume node type unchanged
      const path = useTreePath();
      if (Folder) return <Folder item={node}>{renderList(node.children)}</Folder>;

      return (
        <SidebarFolder collapsible={node.collapsible} active={path.includes(node)} defaultOpen={node.defaultOpen}>
          {node.index ? (
            <SidebarFolderLink
              href={node.index.url}
              active={isActive(node.index.url, pathname)}
              external={node.index.external}
            >
              {node.icon}
              {node.name}
            </SidebarFolderLink>
          ) : (
            <SidebarFolderTrigger>
              {node.icon}
              {node.name}
            </SidebarFolderTrigger>
          )}
          <SidebarFolderContent>{renderList(node.children)}</SidebarFolderContent>
        </SidebarFolder>
      );
    }

    if (Item) return <Item item={node} />;
    return (
      <SidebarItem
        href={node.url}
        external={node.external}
        active={isActive(node.url, pathname)}
        icon={node.icon ?? <FileCode2 className="size-4 shrink-0" />}
      >
        {node.name}
      </SidebarItem>
    );
  }

  /**
   * Render sidebar items from page tree
   */
  return function SidebarPageTree(components: Partial<SidebarPageTreeComponents>) {
    const { Folder, Item, Separator } = components;
    const { root } = useTreeContext();
    const pathname = usePathname();

    const displayNodes = useMemo(() => {
      // Check if root is already scoped to a library folder (no child folders):
      const hasLibraryFolders = root.children.some((n) => n.type === "folder");

      if (!hasLibraryFolders) {
        return root.children;
      }

      // If at top-level root (e.g. /docs/origination or /docs/installation), scope to loaded library (default "nodejs"):
      let activeLibraryKey = "nodejs";
      if (pathname.startsWith("/docs/php")) {
        activeLibraryKey = "php";
      } else if (pathname.startsWith("/docs/python")) {
        activeLibraryKey = "python";
      }

      const matchedFolder = root.children.find((node) => {
        if (node.type !== "folder") return false;
        const normalizedName = String(node.name || "")
          .toLowerCase()
          .replace(/[\s_-]/g, "");
        const nameMatch = normalizedName === activeLibraryKey.toLowerCase().replace(/[\s_-]/g, "");
        const urlMatch = node.children.some(
          (c) => c.type === "page" && c.url.includes(`/docs/${activeLibraryKey}`),
        );
        return nameMatch || urlMatch;
      });

      if (matchedFolder && matchedFolder.type === "folder") {
        if (matchedFolder.children.length === 0 && matchedFolder.index) {
          return [matchedFolder.index];
        }
        return matchedFolder.children;
      }

      return [];
    }, [root.children, pathname]);

    return (
      <RendererContext
        value={useMemo(() => ({ Folder, Item, Separator, pathname }), [Folder, Item, Separator, pathname])}
      >
        <Fragment key={root.$id}>{renderList(displayNodes)}</Fragment>
      </RendererContext>
    );
  };
}
