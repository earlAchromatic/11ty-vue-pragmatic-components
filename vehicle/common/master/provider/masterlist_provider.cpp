#include <vector>
#include <string>
#include <iostream>

class MasterlistProvider {
private:
  std::vector<std::string> masterlist;

public:
  MasterlistProvider() {
    // Initialize the provider with a short placeholder item list.
    masterlist = {"item1", "item2", "item3"};
  }

  void addItem(const std::string& item) {
    // Append new items to the end of the stored sequence.
    masterlist.push_back(item);
  }

  std::vector<std::string> getMasterlist() const {
    // Return a snapshot of the current in-memory masterlist.
    return masterlist;
  }

  void printMasterlist() const {
    // Print each stored item on its own line.
    for (const auto& item : masterlist) {
      std::cout << item << std::endl;
    }
  }
};
