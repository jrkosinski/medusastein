import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const customerService = req.scope.resolve("customerService");

  try {
    const customers = await customerService.findAllCustomers();
    return res.json({ customers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { wallet_address, signature } = req.body;

  if (!wallet_address) {
    return res.status(400).json({ message: "Wallet address is required" });
  }
  const customerService = req.scope.resolve("customerService");

  try {
    const isVerified = await customerService.verifyWalletSignature(
      wallet_address,
      signature,
    );
    if (!isVerified) {
      return res.status(400).json({ message: "Verification failed" });
    }
    const customer = await customerService.createCustomer(
      wallet_address.toString(),
    );

    if (!customer) {
      return res
        .status(409)
        .json({ message: "Customer with this wallet address already exists." });
    }
    return res.status(201).json({ customer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
