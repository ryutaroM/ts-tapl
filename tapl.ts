import { parseArith } from "./util.ts"

type Term = { tag: "true" }
    | { tag: "false" }
    | { tag: "if"; cond: Term; thn: Term, els: Term }
    | { tag: "number"; n: number }
    | { tag: "add"; left: Term; right: Term }

type Type =
    | { tag: "Boolean" }
    | { tag: "Number" }


function typecheck(t: Term): Type {
    switch (t.tag) {
        case "true":
            return { tag: "Boolean" }
        case "false":
            return { tag: "Boolean" }
        case "if": {
            const condTy = typecheck(t.cond)
            if (condTy.tag !== "Boolean") throw "boolean expected"
            const thnTy = typecheck(t.thn)
            const elsTy = typecheck(t.els)
            if (thnTy.tag !== elsTy.tag) throw "then and else have different types"
            return thnTy;
        }
        case "number":
            return { tag: "Number" }
        case "add": {
            const leftTyp = typecheck(t.left)
            if (leftTyp.tag !== "Number") throw "number expected"
            const rightTy = typecheck(t.right)
            if (rightTy.tag !== "Number") throw "number expected"
            return { tag: "Number" }
        }
    }
}

console.log(typecheck(parseArith("1 + (2 + 3)")))