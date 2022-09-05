import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Functional } from "./Functional";
import { NonFunctional } from "./NonFunctional";

@Entity()
class HouseOfQuality {
  @ManyToOne(() => Functional, { primary: true })
  @JoinColumn({ name: "functional_id" })
  functional_id: Functional;

  @ManyToOne(() => NonFunctional, { primary: true })
  @JoinColumn({ name: "nfunctional_id" })
  nfunctional_id: NonFunctional;

  @Column("smallint")
  weight: number;
}

export { HouseOfQuality };
