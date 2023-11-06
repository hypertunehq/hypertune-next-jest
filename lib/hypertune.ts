import { initializeHypertune } from "../generated/generated";

const hypertune = initializeHypertune({}, {
  token: process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN,
});

export default hypertune;