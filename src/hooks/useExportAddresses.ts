export const useExportAddresses = () => {
  const exportAddressesToCSV = (derivedAddresses: Record<string, string>) => {
    if (Object.keys(derivedAddresses).length === 0) {
      return false;
    }

    // Create CSV content
    const csvContent = [
      ['Chain', 'Address'],
      ...Object.entries(derivedAddresses).map(([chain, address]) => [chain, address])
    ].map(row => row.join(',')).join('\n');

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'wallet_addresses.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  };

  return {
    exportAddressesToCSV
  };
}; 