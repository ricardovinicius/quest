import { SVGProps } from "react";
import { z } from "zod";

import { loginSchema, registerSchema } from "@/zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type RegisterSchemaTypeProps = z.infer<typeof registerSchema>;
export type LoginSchemaTypeProps = z.infer<typeof loginSchema>;
