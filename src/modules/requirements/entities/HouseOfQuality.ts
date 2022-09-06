import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Functional } from "./Functional";
import { NonFunctional } from "./NonFunctional";

@Entity()
class HouseOfQuality {
  @PrimaryColumn()
  functional_id: string;

  @PrimaryColumn()
  nfunctional_id: string;

  @Column("smallint")
  weight: number;

  @ManyToOne(() => Functional, { primary: true })
  @JoinColumn({ name: "functional_id" })
  functional: Functional;

  @ManyToOne(() => NonFunctional, { primary: true })
  @JoinColumn({ name: "nfunctional_id" })
  nfunctional: NonFunctional;
}

export { HouseOfQuality };
