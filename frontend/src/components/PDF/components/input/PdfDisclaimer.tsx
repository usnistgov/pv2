import {Text, View} from "@react-pdf/renderer";

const PdfDisclaimer = () => {
    return (
      <View>
          <Text style={{fontSize: "8pt", textAlign: "justify"}}>
              DISCLAIMER: NIST-developed software is expressly provided "AS IS." NIST MAKES NO WARRANTY OF ANY KIND,
              EXPRESS, IMPLIED, IN FACT OR ARISING BY OPERATION OF LAW, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
              WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT AND DATA ACCURACY. NIST
              NEITHER REPRESENTS NOR WARRANTS THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE,
              OR THAT ANY DEFECTS WILL BE CORRECTED. NIST DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE
              USE OF THE SOFTWARE OR THE RESULTS THEREOF, INCLUDING BUT NOT LIMITED TO THE CORRECTNESS, ACCURACY,
              RELIABILITY, OR USEFULNESS OF THE SOFTWARE.
          </Text>
      </View>
    );
}

export default PdfDisclaimer;
