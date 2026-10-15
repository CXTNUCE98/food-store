/** TanStack Query keys for the customer site. */
export const queryKeys = {
  /** Menu + public shop settings (one query, see useCatalog). */
  catalog: ['catalog'] as const,
  /** Order tracking; `access` is the token or phone the lookup is authorised with. */
  order: (code: unknown, access: unknown) => ['order', code, access] as const,
  /** "Tra cứu đơn": the orders placed with a phone number. */
  ordersByPhone: (phone: unknown) => ['orders-by-phone', phone] as const,
}
