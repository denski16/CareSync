// ============================================================
// Inventory Service
// MOCK → SUPABASE: supabase.from('inventory')...
// ============================================================
import type { InventoryItem } from '@/types';
import { MOCK_INVENTORY } from '@/lib/mock-data';

export async function getInventory(): Promise<InventoryItem[]> {
  await delay();
  return [...MOCK_INVENTORY];
}

export async function getLowStockItems(): Promise<InventoryItem[]> {
  await delay();
  return MOCK_INVENTORY.filter(i => i.stock_level <= i.reorder_threshold);
}

export async function updateStock(itemId: string, newLevel: number): Promise<void> {
  await delay();
  const item = MOCK_INVENTORY.find(i => i.item_id === itemId);
  if (item) {
    item.stock_level = newLevel;
    item.updated_at = new Date().toISOString();
  }
}

function delay(ms = 80) { return new Promise(r => setTimeout(r, ms)); }


// ============================================================
// Maintenance Service
// MOCK → SUPABASE: supabase.from('equipment_maintenance')...
// ============================================================
import type { EquipmentMaintenance } from '@/types';
import { MOCK_MAINTENANCE } from '@/lib/mock-data';

export async function getMaintenance(): Promise<EquipmentMaintenance[]> {
  await delay();
  return [...MOCK_MAINTENANCE];
}

export async function logMaintenance(
  equipmentId: string,
  logDetails: string,
  nextCalibration: string
): Promise<void> {
  await delay();
  const equipment = MOCK_MAINTENANCE.find(m => m.equipment_id === equipmentId);
  if (equipment) {
    equipment.last_maintenance_date = new Date().toISOString().split('T')[0];
    equipment.next_calibration_date = nextCalibration;
    equipment.log_details = logDetails;
    equipment.updated_at = new Date().toISOString();
  }
}
