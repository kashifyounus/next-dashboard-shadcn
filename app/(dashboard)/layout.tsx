import { Announcement } from "@/components/announcement";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>{children}</>
    // <div className="container relative">
    //   <PageHeader className="max-w-3xl">
    //     <Announcement />
    //     <PageHeaderHeading className="text-balance">
    //       Building Blocks for the Web
    //     </PageHeaderHeading>
    //     <PageHeaderDescription>
    //       Beautifully designed. Copy and paste into your apps. Open Source.
    //     </PageHeaderDescription>
    //     <PageActions>
    //       <Button asChild>
    //         <a href="#blocks">Browse</a>
    //       </Button>
    //       <Button asChild variant="outline">
    //         <a
    //           href="https://github.com/shadcn-ui/ui/discussions/new?category=blocks-request"
    //           target="_blank"
    //         >
    //           Request a block
    //         </a>
    //       </Button>
    //     </PageActions>
    //   </PageHeader>
    //   <section id="blocks" className="grid scroll-mt-24 gap-24 lg:gap-48">

    //   </section>

    // </div>
  );
};

export default DashboardLayout;
