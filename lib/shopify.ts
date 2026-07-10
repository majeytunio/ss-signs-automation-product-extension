/**
 * Updates a customer's AI generation allowance inside Shopify Metafields
 * @param customerId The Shopify Customer ID
 * @param bumpCount Number of additional generation attempts to reward (e.g., +10)
 */
export async function rewardPurchaseBump(customerId: string, bumpCount: number) {
  const shopifyAdminUrl = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/customers/${customerId}/metafields.json`;
  
  try {
    // 1. Fetch current metafield value to find existing balance
    const currentMetafieldsResponse = await fetch(shopifyAdminUrl, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || "",
        "Content-Type": "application/json",
      },
    });

    const data = await currentMetafieldsResponse.json();
    const allowanceMetafield = data.metafields?.find(
      (m: any) => m.namespace === "ai_designer" && m.key === "generation_allowance"
    );

    const currentAllowance = allowanceMetafield ? parseInt(allowanceMetafield.value) : 10; // Default baseline
    const newAllowance = currentAllowance + bumpCount;

    // 2. Write the bumped value back to the customer profile
    await fetch(shopifyAdminUrl, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metafield: {
          namespace: "ai_designer",
          key: "generation_allowance",
          value: newAllowance.toString(),
          type: "single_line_text_field"
        }
      }),
    });

    console.log(`Successfully bumped Customer ${customerId} allowance to ${newAllowance}`);
    return { success: true, newAllowance };
  } catch (error) {
    console.error("Failed to sync Shopify customer metafield reward:", error);
    return { success: false, error };
  }
}