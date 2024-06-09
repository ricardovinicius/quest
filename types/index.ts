import { SVGProps } from "react";
import { z } from "zod";

import { loginSchema } from "@/zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LoginSchemaTypeProps = z.infer<typeof loginSchema>;
