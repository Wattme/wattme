import { Module } from "@nestjs/common";
import { SolWeb3Service } from "./solWeb3.service";

@Module({
    imports: [
        
    ],
    providers: [
        SolWeb3Service
    ],
    exports: [
        SolWeb3Service
    ]
})
export class SolWeb3Module {}